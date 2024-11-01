package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.UpdatePasswordDto;
import nextDevs.CapstonebackEnd.dto.UserDataDto;
import nextDevs.CapstonebackEnd.dto.UserDto;
import nextDevs.CapstonebackEnd.exception.BadRequestException;
import nextDevs.CapstonebackEnd.exception.NotFoundException;
import nextDevs.CapstonebackEnd.model.BalanceRequest;
import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<User> getAllUser(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "15") int size,
                                 @RequestParam(defaultValue = "id") String sortBy) {
        return userService.getAllUsers(page, size, sortBy);
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public User getUserById(@PathVariable int id) throws NotFoundException {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new NotFoundException("User con id: " + id + " non trovata");
        }
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public User updateUser(@PathVariable int id, @RequestBody @Validated UserDto userDto, BindingResult bindingResult) throws NotFoundException {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(e -> e.getDefaultMessage()).reduce("", ((s1, s2) -> s1 + s2)));
        }
        return userService.updateUser(id, userDto);
    }

    @PatchMapping("/users/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public UserDataDto patchUser(@PathVariable int id, @RequestBody UserDto userDto) {
        return userService.patchUser(id, userDto);
    }

    @PatchMapping(value = "/users/{id}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public UserDataDto patchAvatarUser(@PathVariable int id, @RequestParam("file") MultipartFile avatar) throws IOException {
        return userService.patchAvatarUser(id, avatar);
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteUser(@PathVariable int id) throws NotFoundException {
        return userService.deleteUser(id);
    }
//    @PatchMapping ("/users/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
//    public String patchAvatarUser(@RequestBody MultipartFile avatar, @PathVariable int id) throws IOException {
//        return userService.patchAvatarUser(id, avatar);
//
//    }

    @PatchMapping("/users/{id}/password")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public void updatePassword(@PathVariable int id, @RequestBody @Validated UpdatePasswordDto updatePasswordDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(e -> e.getDefaultMessage()).reduce("", ((s1, s2) -> s1 + s2)));
        }
        userService.updatePassword(id, updatePasswordDto);
    }


    @PutMapping("/users/{id}/newsletter")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<User> updateNewsletter(@PathVariable Integer id, @RequestBody Map<String, Boolean> newsletter) {
        User updatedUser = userService.updateNewsletterPreference(id, newsletter.get("newsletter"));
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{userId}/balance")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<User> updateBalance(@PathVariable Integer userId, @RequestBody BalanceRequest balanceRequest) {
        try {
            User updatedUser = userService.updateBalance(userId, balanceRequest.getAmount());
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/api/users/{id}/withdraw")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<BigDecimal> withdrawFunds(@PathVariable Integer id, @RequestBody BalanceRequest balanceRequest) {
        BigDecimal newBalance = userService.withdrawFunds(id, balanceRequest.getAmount()).getBalance();
        return ResponseEntity.ok(newBalance);
    }
    @GetMapping("/{userId}/stocks")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public List<Stock> getUserStocks(@PathVariable Integer userId) {
        return userService.getUserStocks(userId);
    }
}



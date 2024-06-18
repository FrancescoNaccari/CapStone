package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.AuthDataDto;
import nextDevs.CapstonebackEnd.dto.UserDto;
import nextDevs.CapstonebackEnd.dto.UserLoginDto;
import nextDevs.CapstonebackEnd.exception.BadRequestException;
import nextDevs.CapstonebackEnd.service.AuthService;
import nextDevs.CapstonebackEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;



    @PostMapping("/auth/register")
    public Integer saveUser(@RequestBody @Validated UserDto userDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage).reduce("",((s1, s2) -> s1+s2)));
        }
        return userService.saveUser(userDto);
    }

    @PostMapping("/auth/login")
    public AuthDataDto login(@RequestBody @Validated UserLoginDto userLoginDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage).
                    reduce("", (s, s2) -> s+s2));
        }

        return authService.authenticateUserAndCreateToken(userLoginDto);
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login"; // Assicurati di avere una pagina di login personalizzata
    }

    @RequestMapping("/home")
    public String home(@AuthenticationPrincipal OidcUser principal) {
        // Puoi ottenere le informazioni dell'utente autenticato da principal
        return "home";
    }


}

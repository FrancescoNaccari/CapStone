package nextDevs.CapstonebackEnd.service;



import nextDevs.CapstonebackEnd.dto.AuthDataDto;
import nextDevs.CapstonebackEnd.dto.UserDataDto;
import nextDevs.CapstonebackEnd.dto.UserLoginDto;
import nextDevs.CapstonebackEnd.exception.UnauthorizedException;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTool jwtTool;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthDataDto authenticateUserAndCreateToken(UserLoginDto userLoginDTO) {
        Optional<User> userOptional = userService.getUserByEmail(userLoginDTO.getEmail());
        if (userOptional.isEmpty()) {
            throw new UnauthorizedException("Error in authorization, relogin!");
        } else {
            User user = userOptional.get();
            if (passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
                AuthDataDto authDataDto = new AuthDataDto();
                authDataDto.setAccessToken(jwtTool.createToken(user));
                UserDataDto userDataDto = new UserDataDto();
                userDataDto.setNome(user.getNome());
                userDataDto.setCognome(user.getCognome());
                userDataDto.setAvatar(user.getAvatar());
                userDataDto.setEmail(user.getEmail());
                userDataDto.setUsername(user.getUsername());
                userDataDto.setIdUtente(user.getIdUtente());
                userDataDto.setTipoUtente(user.getTipoUtente());
                userDataDto.setBalance(user.getBalance());
                userDataDto.setNewsletter(user.isNewsletter());
                userDataDto.setStripeAccountId(user.getStripeAccountId());
                authDataDto.setUser(userDataDto);
                return authDataDto;
            } else {
                throw new UnauthorizedException("Error in authorization, relogin!");
            }
        }
    }
}

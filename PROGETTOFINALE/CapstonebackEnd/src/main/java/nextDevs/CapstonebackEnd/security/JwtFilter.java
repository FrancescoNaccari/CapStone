package nextDevs.CapstonebackEnd.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import nextDevs.CapstonebackEnd.exception.NotFoundException;
import nextDevs.CapstonebackEnd.exception.UnauthorizedException;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTool jwtTool;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;  // La richiesta viene continuata senza un'autenticazione
        }

        String token = authHeader.substring(7);

        jwtTool.verifyToken(token);

        int userId = jwtTool.getIdFromToken(token);

        Optional<User> userOptional = userService.getUserById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            throw new NotFoundException("Utente non trovato con id " + userId);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return List.of("/webhook/**", "/auth/**", "/logos/**")
                .stream()
                .anyMatch(p -> new AntPathMatcher().match(p, request.getServletPath()));
    }
}

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
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                jwtTool.verifyToken(token);  // Verifica il token
                int userId = jwtTool.getIdFromToken(token);  // Estrai l'ID utente dal token

                Optional<User> userOptional = userService.getUserById(userId);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

            } catch (Exception e) {
                System.out.println("token non valido");
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token non valido o mancante");
                return;
            }
        } else if (!shouldNotFilter(request)) {// Controlla se la rotta dovrebbe essere filtrata
            System.out.println("token non presente");

            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token non presente o invalido");
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return List.of("/auth/**", "/webhook/**", "/logos/**")  // Lista delle rotte pubbliche
                .stream()
                .anyMatch(p -> new AntPathMatcher().match(p, request.getServletPath()));
    }

}

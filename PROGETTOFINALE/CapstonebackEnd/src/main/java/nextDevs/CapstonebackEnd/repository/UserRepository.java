package nextDevs.CapstonebackEnd.repository;


import nextDevs.CapstonebackEnd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
 Optional<User> findByEmail(String email);
 @Query("SELECT u FROM User u LEFT JOIN FETCH u.stocks WHERE u.id = :userId")
 Optional<User> findByIdWithStocks(@Param("userId") Integer userId);
}

package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.NewsletterSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterSubscriptionRepository extends JpaRepository<NewsletterSubscription, Integer> {
}

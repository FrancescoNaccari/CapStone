package nextDevs.CapstonebackEnd.repository;

public interface GenericService {
    Class<T> getType();
    void save(T entity);
}

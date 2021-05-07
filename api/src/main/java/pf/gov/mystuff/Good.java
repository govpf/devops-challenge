package pf.gov.mystuff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Good {
    @Id
    @GeneratedValue
    private Long Id;

    private String name;

    public Good(String name)    {
        this.name = name;
    }
}
package pf.gov.mystuff.exceptions;

import javassist.NotFoundException;

public class GoodNotFoundException extends NotFoundException {
    public GoodNotFoundException() {
        super("Good does not exists");
    }

    public GoodNotFoundException(Long id) {
        super(String.format("Good id=%s does not exists", id));
    }
}


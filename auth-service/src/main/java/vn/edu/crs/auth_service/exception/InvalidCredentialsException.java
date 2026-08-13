// purpose: exception rieng cho loi sai username/password, tranh dung chung voi
// NoSuchElementException cua JDK
package vn.edu.crs.auth_service.exception;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException(String message) {
        super(message);
    }
}

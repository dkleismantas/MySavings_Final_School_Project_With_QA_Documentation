package config;

public final class TestConfig {
    private TestConfig() {
    }

    public static String baseUrl() {
        return System.getProperty("baseUrl", "http://localhost:5173");
    }

    public static String loginUrl() {
        return baseUrl() + "/login";
    }

    public static String testEmail() {
        return System.getProperty("testEmail", "user41314@example.com");
    }

    public static String testPassword() {
        return System.getProperty("testPassword", "Password123!");
    }
}

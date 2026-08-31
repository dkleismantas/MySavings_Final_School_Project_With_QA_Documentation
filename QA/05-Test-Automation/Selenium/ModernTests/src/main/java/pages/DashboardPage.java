package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

public class DashboardPage extends BasePage {
    private final By heading = By.xpath("//h1[normalize-space()='Your Financial Overview']");
    private final By logoutButton = By.cssSelector("button[title='Log Out']");
    private final By newGoalButton = By.xpath("//button[normalize-space()='+ New goal']");
    private final By sortSelect = By.xpath("//label[contains(normalize-space(), 'Sort by')]/select");
    private final By filterButton = By.xpath("//button[normalize-space()='Filters']");
    private final By searchInput = By.cssSelector("input[placeholder='Search by name...']");
    private final By applyFiltersButton = By.xpath("//button[normalize-space()='Apply Filters']");

    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    public boolean isLoaded() {
        return isDisplayed(heading);
    }

    public void logout() {
        click(logoutButton);
    }

    public void openNewGoalModal() {
        click(newGoalButton);
    }

    public void sortBy(String value) {
        new Select(wait.until(org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(sortSelect)))
                .selectByValue(value);
    }

    public void openFilters() {
        click(filterButton);
    }

    public void searchGoals(String value) {
        type(searchInput, value);
    }

    public void applyFilters() {
        click(applyFiltersButton);
    }

    public String selectedSort() {
        return new Select(wait.until(org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(sortSelect)))
                .getFirstSelectedOption().getAttribute("value");
    }
}

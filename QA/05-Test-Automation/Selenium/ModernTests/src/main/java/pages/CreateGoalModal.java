package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CreateGoalModal extends BasePage {
    private final By modalTitle = By.xpath("//h2[normalize-space()='Create New Goal']");
    private final By goalTitleLabel = By.xpath("//label[normalize-space()='Goal title']");
    private final By targetAmountLabel = By.xpath("//label[normalize-space()='Target amount (€)']");
    private final By targetDateLabel = By.xpath("//label[normalize-space()='Target date']");

    public CreateGoalModal(WebDriver driver) {
        super(driver);
    }

    public boolean isLoaded() {
        return isDisplayed(modalTitle);
    }

    public boolean hasGoalTitleField() {
        return isDisplayed(goalTitleLabel);
    }

    public boolean hasTargetAmountField() {
        return isDisplayed(targetAmountLabel);
    }

    public boolean hasTargetDateField() {
        return isDisplayed(targetDateLabel);
    }
}

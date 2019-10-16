package org.softwire.training.api.integration;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.softwire.training.api.integration.helper.LoginHelper;
import org.softwire.training.api.integration.helper.WebDriverHelper;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AdminIT {

    public static final String TARGET_ADDRESS = System.getProperty("target.address");

    private static WebDriver driver;
    private static WebDriverWait wait;

    @BeforeAll
    public static void setUp() {
        driver = WebDriverHelper.getSharedDriver();
        wait = new WebDriverWait(driver, 10);
    }

    @Test
    public void testCanViewAdminLocations() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/locations");

        WebElement header = driver.findElement(By.tagName("h3"));
        assertTrue(header.getText().contains("locations"));
    }

    @Test
    public void testCanViewAdminRegions() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/regions");

        WebElement header = driver.findElement(By.tagName("h3"));
        assertTrue(header.getText().contains("regions"));
    }

    @Test
    public void testCanViewAdminUsers() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/users");

        WebElement header = driver.findElement(By.tagName("h3"));
        assertTrue(header.getText().contains("users"));
    }

    @Test
    public void testCanAddAdminLocations() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/locations/add");

        WebElement siteName = driver.findElement(By.id("site-name"));
        siteName.sendKeys("Test Site Name");
        WebElement locationName = driver.findElement(By.id("location-name"));
        locationName.sendKeys("Test Location Name");
        WebElement locationLon = driver.findElement(By.id("location-lon"));
        locationLon.sendKeys("01.1234");
        WebElement locationLat = driver.findElement(By.id("location-lat"));
        locationLat.sendKeys("01.1234");
        WebElement timeZone = driver.findElement(By.id("time-zone"));
        timeZone.sendKeys("Europe/London");

        siteName.submit();
        wait.until(ExpectedConditions.stalenessOf(siteName));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("locations"));
    }

    @Test
    public void testCanAddAdminLocationsWithRegion() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/locations/add");

        WebElement siteName = driver.findElement(By.id("site-name"));
        siteName.sendKeys("Test Site Name");
        WebElement locationName = driver.findElement(By.id("location-name"));
        locationName.sendKeys("Test Location Name");
        WebElement locationLon = driver.findElement(By.id("location-lon"));
        locationLon.sendKeys("01.1234");
        WebElement locationLat = driver.findElement(By.id("location-lat"));
        locationLat.sendKeys("01.1234");
        WebElement timeZone = driver.findElement(By.id("time-zone"));
        timeZone.sendKeys("Europe/London");
        WebElement regionId = driver.findElement(By.id("region-id"));
        regionId.sendKeys("1");

        siteName.submit();
        wait.until(ExpectedConditions.stalenessOf(siteName));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("locations"));
    }

    @Test
    public void testCanAddAdminRegions() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/regions/add");

        WebElement regionName = driver.findElement(By.id("region-name"));
        regionName.sendKeys("Test Region Name");

        regionName.submit();
        wait.until(ExpectedConditions.stalenessOf(regionName));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("regions"));
    }

    @Test
    public void testCanAddAdminUsers() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/users/add");

        WebElement userName = driver.findElement(By.id("username"));
        userName.sendKeys("A" + Math.random());
        WebElement fakePassword = driver.findElement(By.id("password"));
        fakePassword.sendKeys("password");

        userName.submit();
        wait.until(ExpectedConditions.stalenessOf(userName));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("users"));
    }

    @Test
    public void testCanAddAdminUserAdmin() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/users/add");

        WebElement userName = driver.findElement(By.id("username"));
        userName.sendKeys("A" + Math.random());
        WebElement fakePassword = driver.findElement(By.id("password"));
        fakePassword.sendKeys("password");
        WebElement adminSelect = driver.findElement(By.id("admin-select"));
        adminSelect.click();

        userName.submit();
        wait.until(ExpectedConditions.stalenessOf(userName));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("users"));
    }

    @Test
    public void testCanAddAdminUserAgent() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/users/add");

        WebElement userName = driver.findElement(By.id("username"));
        userName.sendKeys("A" + Math.random());
        WebElement fakePassword = driver.findElement(By.id("password"));
        fakePassword.sendKeys("password");
        WebElement agentSelect = driver.findElement(By.id("agent-select"));
        agentSelect.click();

        WebElement firstName = driver.findElement(By.id("first-name"));
        firstName.sendKeys("FIRSTNAME");
        WebElement lastName = driver.findElement(By.id("last-name"));
        lastName.sendKeys("LASTNAME");
        WebElement dateOfBirth = driver.findElement(By.id("date-of-birth"));
        dateOfBirth.sendKeys("01012000");
        WebElement rank = driver.findElement(By.id("rank"));
        rank.sendKeys("1");
        WebElement callsign = driver.findElement(By.id("callsign"));
        callsign.sendKeys("test callsign");

        callsign.submit();
        wait.until(ExpectedConditions.stalenessOf(callsign));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("users"));
    }

    @Test
    public void testCanAddAdminUserAgentAdmin() {
        driver.get(TARGET_ADDRESS);
        LoginHelper.ensureLoggedInAdmin(driver);
        driver.get(TARGET_ADDRESS + "/#/admin/users/add");

        WebElement userName = driver.findElement(By.id("username"));
        userName.sendKeys("A" + Math.random());
        WebElement fakePassword = driver.findElement(By.id("password"));
        fakePassword.sendKeys("password");
        WebElement agentSelect = driver.findElement(By.id("agent-select"));
        agentSelect.click();
        WebElement adminSelect = driver.findElement(By.id("admin-select"));
        adminSelect.click();

        WebElement firstName = driver.findElement(By.id("first-name"));
        firstName.sendKeys("FIRSTNAME");
        WebElement lastName = driver.findElement(By.id("last-name"));
        lastName.sendKeys("LASTNAME");
        WebElement dateOfBirth = driver.findElement(By.id("date-of-birth"));
        dateOfBirth.sendKeys("01012000");
        WebElement rank = driver.findElement(By.id("rank"));
        rank.sendKeys("1");
        WebElement callsign = driver.findElement(By.id("callsign"));
        callsign.sendKeys("test callsign");

        callsign.submit();
        wait.until(ExpectedConditions.stalenessOf(callsign));

        assertTrue(driver.findElement(By.tagName("h3")).getText().contains("users"));
    }
}

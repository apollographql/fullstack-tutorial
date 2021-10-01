const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
driver.get('http://www.google.com').then(function(){
    driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n').then(function(){
        driver.getTitle().then(function(title) {
            console.log(title)
            if(title === 'webdriver - Google Search') {
                console.log('Test passed');
            } else {
                console.log('Test failed');
            }
            driver.quit();
        });
    });
});

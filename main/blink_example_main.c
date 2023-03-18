#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#define GPIO_OUTPUT_IO_2    2

void app_main()
{
    esp_rom_gpio_pad_select_gpio(GPIO_OUTPUT_IO_2);
    gpio_set_direction(GPIO_OUTPUT_IO_2, GPIO_MODE_OUTPUT);

    bool led = false;

    while (1) {
        led = !led;  // Đảo ngược trạng thái của biến led
        gpio_set_level(GPIO_OUTPUT_IO_2, led);
        printf("LED is %s\n", led ? "ON" : "OFF");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

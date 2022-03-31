import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class Timer {
  constructor({ onTick, onConvert, onDisebled } = {}) {
    this.selectedData = 0;
    this.convertDate = {};
    this.isActive = false;
    this.onTick = onTick;
    this.onConvert = onConvert;
    this.onDisebled = onDisebled;
  }

  getCountdownTime() {
    return this.selectedData - Date.now();
  }

  choosesDates(selectedDates) {
    if (selectedDates[0] > Date.now() && !this.isActive) {
      this.isActive = true;
      this.onDisebled(false);
    }
    if (selectedDates[0] < Date.now()) {
      this.onDisebled(true);
      Notify.failure('Please choose a date in the future');
    }
  }

  turnsOnTimer(deltaTime) {
    const intervalId = setInterval(() => {
      deltaTime -= 1000;
      this.convertDate = this.onConvert(deltaTime);
      this.onTick(this.convertDate);

      console.log(this.convertDate);

      if (deltaTime < 1000) {
    
        clearInterval(intervalId);
        this.isActive = false;
      }
    }, 1000);
  }
}

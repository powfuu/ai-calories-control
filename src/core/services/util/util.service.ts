import { NutritionData } from './../../../app/domain/models/nutrition-data.model';
import { Injectable, inject } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { LocalStoreService } from '../localStore/local-store.service';
import { StoreDispatchService } from '../store-dispatch/store-dispatch.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
import { Constants } from 'src/app/constants/app.constants';
import { SystemContent } from 'src/app/domain/models/system-content.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  alertController = inject(AlertController);
  toastService = inject(ToastService);
  localStoreService = inject(LocalStoreService);
  storeDispatch = inject(StoreDispatchService);
  loading = inject(LoadingService);
  router = inject(Router);

  async addNutritionDataToLog(nutritionData: NutritionData) {
    this.localStoreService
      .pushValue('log', nutritionData)
      .then(() => this.storeDispatch.addNutritionDataToLog(nutritionData));
  }

  async setNutritionDataLog(nutritionData: NutritionData[]) {
    this.localStoreService
      .setToLocalStore('log', nutritionData)
      .then(() => this.storeDispatch.setNutritionDataLog(nutritionData));
  }

  async crearAlertConfirmacion(
    canCancelar: boolean,
    mensaje: string,
    handlerAceptar: Function,
    header?: string,
    handlerCancelar?: Function,
  ) {
    let buttons;
    if (canCancelar) {
      buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            if (handlerCancelar) {
              handlerCancelar();
            }
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            if (handlerAceptar) {
              handlerAceptar();
            }
          },
        },
      ];
    } else {
      buttons = [
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handlerAceptar) {
              handlerAceptar();
            }
          },
        },
      ];
    }
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: header || 'CONFIRMACIÓN',
      message: mensaje,
      mode: 'ios',
      buttons: buttons,
    });

    await alert.present();
  }

  getRequestByType(type: keyof SystemContent, prompt: string) {
    return {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: this.getSystemContentByType(type),
        },
        { role: 'user', content: prompt },
      ],
    };
  }

  getSystemContentByType(type: keyof SystemContent): string {
    const systemContent = {
      [Constants.OPENAI_TYPE_HMC]:
        'I will send you various foods or any edible data, I need you to answer me only with the following data: Calories: calories value, Fibers: fibers value, Sugars: sugars value, Proteins: proteins value and Fats: fats value. you can provide anything about the nutrition, this is a basic example of a prompt that i will send you, you can get an idea of the responses: "a porcion of rice with chicken friend and cocacola vase". your answer will always be the value, if you dont know the value because it does not specify the size or the g. portions that the food had, then you will answer with a approximated value, and dont specify anything else that the value, for example "0g" or "500" in case of Calories or "500g" in the other cases, if user sends you a combination of food, for example a lot of food, then your response will be the value of the sum of all the food. please be accurate with your responses, always try to give the correct values. THINGS TO AVOID: only answer with values, dont complete with a text for example: "230 calories" this is incorrect, the correct answer will be "230", this applies to all cases, and always follow the structure in string: Calories: value (example 230), Fibers: value (example 230g), Sugars: value (example 230g), Proteins: value (example 230g), Fats: value (example 230g).',
      [Constants.OPENAI_TYPE_SR]:
        'I want you to answer everything i will ask you, you will only answer the questions similar to: Body, life management, food, healthy, fitness, excercises and everything about that fitness and healthy world, if the question does no have any similar to that, then your answer will be only "The pompt you send does not have any similar to the App, make sure you ask correct questions. everything about calories, weigh and recommended tips or calories to consume, please be carefull about know the correct answer or not, everything about fitness, weigh, excersises in home for getting better healthy, body and got a better life style is valid. give me a answer related to the question, for example if the prompt is "loose weigh" then you will give me a tips to loose weigh, every answer you have, are tips or knoweldge/recommendations about the question. please the answer length will be from a minimum of 200 characters to 350. please another thing to do in the prompt you will send: if there are important words to mark, then mark that word in a <span class="important"></span>, give me a minimum of 3 important words/span.',
    };
    return systemContent[type];
  }
}

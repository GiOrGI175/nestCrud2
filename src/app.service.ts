import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAnimals(lang) {
    const animals = {
      ka: [
        {
          id: 1,
          name: 'ცხენი',
        },
      ],

      en: [
        {
          id: 1,
          name: 'horse',
        },
      ],
    };

    return animals[lang];
  }
}

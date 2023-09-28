import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Todo} from '../models';
import {TodoRepository} from '../repositories';

export class NumberConversionController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @post('/to/number')
  @response(200, {
    description: 'Todo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async convertToNumber(
    @requestBody()
    data: {
      words: string;
    },
  ): Promise<{
    number: number;
  }> {
    const words: string = data.words;
    const wordMap: {[key: string]: number} = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
    };
    const units: {[key: string]: number} = {
      hundred: 100,
      thousand: 1000,
      million: 1000000,
      billion: 1000000000,
    };
    let finalNumber: number = 0;
    let cnumber: number = 0;
    let numbers: number[] = [];
    words
      .toLowerCase()
      .split(' ')
      .forEach(n => {
        if (wordMap[n]) {
          cnumber += wordMap[n];
        } else if (units[n]) {
          if (numbers.length && units[n] > numbers[numbers.length - 1]) {
            numbers[numbers.length - 1] += cnumber;
            numbers[numbers.length - 1] *= units[n];
          } else {
            numbers.push(cnumber * units[n]);
          }
          cnumber = 0;
        } else {
          return 'Invalid Number';
        }
      });
    if (cnumber > 0) {
      numbers.push(cnumber);
    }

    for (let number of numbers) {
      finalNumber += number;
    }
    return {
      number: finalNumber,
    };
  }

  @post('/to/words')
  @response(200, {
    description: 'Todo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async convertToWord(@requestBody() data: {number: number}): Promise<{
    words: string;
  }> {
    return {
      words: this.todoRepository.numberToWordConverstion(data.number),
    };
  }
}

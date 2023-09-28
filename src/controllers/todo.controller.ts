import {CountSchema, repository} from '@loopback/repository';
import {get, response} from '@loopback/rest';
import axios from 'axios';
import {TodoRepository} from '../repositories';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @get('/univeristies/get')
  @response(200, {
    description: 'Todo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(): Promise<any> {
    // {
    //   "country": "United States",
    //   "domains": [
    //   "lindenwood.edu"
    //   ],
    //   "alpha_two_code": "US",
    //   "state-province": null,
    //   "web_pages": [
    //   "http://www.lindenwood.edu/"
    //   ],
    //   "name": "Lindenwood University"
    //   }
    let responseData:
      | {
          country: string;
          domains: string[];
          alpha_two_code: string;
          state: string | null;
          web_pages: string[];
          name: string;
        }
      | any = [];
    await axios({
      method: 'get',
      url: 'http://universities.hipolabs.com/search?country=United+States',
    }).then(function (response) {
      responseData = response.data;
    });

    responseData.sort(
      (
        a: {
          country: string;
          domains: string[];
          alpha_two_code: string;
          state: string | null;
          web_pages: string[];
          name: string;
        },
        b: {
          country: string;
          domains: string[];
          alpha_two_code: string;
          state: string | null;
          web_pages: string[];
          name: string;
        },
      ) => {
        const nameA = a.name.toUpperCase(); // Convert to uppercase to make the comparison case-insensitive
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
    );
    // Sort it using name
    // add only

    let finalData: {
      country: string;
      alpha_two_code: string;
      name: string;
    }[] = [];

    for (const data of responseData) {
      finalData.push({
        alpha_two_code: data.alpha_two_code,
        country: data.country,
        name: data.name,
      });
    }
    return finalData;
  }

  @get('/addRandomValue')
  @response(200, {
    description: 'Todo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async addRandomValue(): Promise<any> {
    const x = await this.todoRepository.create({
      name: 'Value' + Math.random(),
    });
    return x;
  }
}

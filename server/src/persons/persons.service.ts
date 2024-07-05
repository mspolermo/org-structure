import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Person } from './persons.model';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PersonsService {
    constructor(@InjectModel(Person) private personRepository: typeof Person) {}

    async createPerson(dto: CreatePersonDto) {
        const person = await this.personRepository.create(dto);
        return person;
    }

    async getAllPersons() {
        const persons = await this.personRepository.findAll();
        return persons;
    }

    async getPerson(id: string) {
        const role = await this.personRepository.findOne({ where: { id } });
        return role;
    }
}

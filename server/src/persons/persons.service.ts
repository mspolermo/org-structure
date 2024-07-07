import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Person } from './persons.model';
import { CreatePersonDto } from './dto/create-person.dto';
import { User } from 'src/users/users.model';
import { CreatePersonDetalesDto } from './dto/create-person-detales.dto';
import { PersonDetales } from './person-detales.model';

@Injectable()
export class PersonsService {
    constructor(
        @InjectModel(Person) private personRepository: typeof Person,
        @InjectModel(PersonDetales)
        private personDetalesRepository: typeof PersonDetales,
    ) {}

    async createPerson(dto: CreatePersonDto) {
        const person = await this.personRepository.create(dto);
        return person;
    }

    async getAllPersons() {
        const persons = await this.personRepository.findAll();
        return persons;
    }

    async getPersonById(id: string) {
        const role = await this.personRepository.findOne({ where: { id } });
        return role;
    }

    async getPersonByEmail(email: string) {
        const role = await this.personRepository.findOne({
            where: { email },
            include: [{ all: true }, { model: User }, { model: PersonDetales }],
        });
        return role;
    }

    async createPersonDetales(dto: CreatePersonDetalesDto, personId: string) {
        const person = await this.getPersonById(personId);
        if (!person) {
            throw new HttpException(
                'Сотрудник с данным ID не найден',
                HttpStatus.BAD_REQUEST,
            );
        }
        const personDetales = await this.personDetalesRepository.create({
            ...dto,
            personId: person.id,
        });

        return personDetales;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Person } from './persons.model';
import { CreatePersonDto } from './dto/create-person.dto';
import { User } from 'src/users/users.model';
import { CreatePersonDetalesDto } from './dto/create-person-detales.dto';
import { PersonDetales } from './person-detales.model';
import { OrgUnit } from 'src/org-unit/org-unit.model';

@Injectable()
export class PersonsService {
    constructor(
        @InjectModel(Person) private personRepository: typeof Person,
        @InjectModel(PersonDetales)
        private personDetalesRepository: typeof PersonDetales,
        @InjectModel(OrgUnit) private orgUnitRepository: typeof OrgUnit,
    ) {}

    async createPerson(dto: CreatePersonDto) {
        if (dto.isChef) {
            const orgUnit = await this.orgUnitRepository.findByPk(
                dto.orgUnitId,
            );

            if (orgUnit.chefId) {
                throw new HttpException(
                    'В этом оргЮните уже назначен начальник',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const person = await this.personRepository.create(dto);
            orgUnit.chefId = person.id;
            await orgUnit.save();
            return person;
        } else {
            const person = await this.personRepository.create(dto);
            return person;
        }
    }

    async getAllPersons() {
        const persons = await this.personRepository.findAll();
        return persons;
    }

    async getPersonById(id: string) {
        const role = await this.personRepository.findOne({ where: { id } });
        if (!role) {
            throw new HttpException(
                'Сотрудник с данным ID не найден',
                HttpStatus.BAD_REQUEST,
            );
        }
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
        const personDetales = await this.personDetalesRepository.create({
            ...dto,
            personId: person.id,
        });
        return personDetales;
    }

    async getPersonDetalesById(personId: string) {
        const personDetales = await this.personDetalesRepository.findOne({
            where: { personId },
        });
        if (!personDetales) {
            throw new HttpException(
                'Детали для сотрудник с данным ID не найдены',
                HttpStatus.BAD_REQUEST,
            );
        }
        return personDetales;
    }
}

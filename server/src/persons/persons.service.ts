import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Person } from './persons.model';
import { CreatePersonDto } from './dto/create-person.dto';
import { User } from 'src/users/users.model';
import { CreatePersonDetalesDto } from './dto/create-person-detales.dto';
import { PersonDetales } from './person-detales.model';
import { OrgUnit } from 'src/org-unit/org-unit.model';

const generateRandomNumber = (length: number): string => {
    //TODO вынести в хелперы
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

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

            if (!orgUnit) {
                throw new HttpException(
                    'OrgUnit с данным ID не найден',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (orgUnit.chefId) {
                throw new HttpException(
                    'В этом оргЮните уже назначен начальник',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const person = await this.personRepository.create(dto);

        // Генерация телефона и табельного номера, если они не переданы

        const formattedOrgUnitId = generateRandomNumber(2);
        const formattedPersonId = generateRandomNumber(2);

        person.phone =
            dto.phone ?? `343-${formattedOrgUnitId}-${formattedPersonId}`;
        person.table =
            dto.table ?? `${formattedOrgUnitId}-${formattedPersonId}`;

        await person.save();

        if (dto.isChef) {
            const orgUnit = await this.orgUnitRepository.findByPk(
                dto.orgUnitId,
            );
            orgUnit.chefId = person.id;
            await orgUnit.save();
        }

        return person;
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

    async deletePerson(id: string): Promise<boolean> {
        const person = await this.personRepository.findByPk(id);
        if (!person) {
            return false;
        }
        await person.destroy();
        return true;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';
import { Person } from 'src/persons/persons.model';

@Injectable()
export class OrgUnitService {
    constructor(
        @InjectModel(OrgUnit) private orgUnitRepository: typeof OrgUnit,
    ) {}

    async createOrgUnit(dto: CreateOrgUnitDto) {
        let nestingLevel = 0;

        if (dto.parentOrgUnitId) {
            const parentOrgUnit = await this.orgUnitRepository.findOne({
                where: { id: dto.parentOrgUnitId },
            });

            if (!parentOrgUnit) {
                throw new HttpException(
                    'Parent OrgUnit with the given ID not found',
                    HttpStatus.BAD_REQUEST,
                );
            }

            nestingLevel = parentOrgUnit.nestingLevel + 1;
        }

        const orgUnit = await this.orgUnitRepository.create({
            ...dto,
            nestingLevel,
        });

        return orgUnit;
    }

    async getAllOrgUnits() {
        const orgUnits = await this.orgUnitRepository.findAll({
            include: [
                {
                    model: Person,
                    as: 'chef',
                },
                {
                    model: Person,
                    as: 'persons',
                    where: {
                        isChef: false,
                        isManager: false,
                    },
                    required: false,
                },
                {
                    model: Person,
                    as: 'managers',
                    where: {
                        isManager: true,
                    },
                    required: false,
                },
                {
                    model: OrgUnit,
                    as: 'childOrgUnitItems',
                },
            ],
        });
        return orgUnits;
    }

    async getOrgUnitById(id: string) {
        const orgUnit = await this.orgUnitRepository.findOne({ where: { id } });
        if (!orgUnit) {
            throw new HttpException(
                'ОргЮнит с данным ID не найден',
                HttpStatus.BAD_REQUEST,
            );
        }
        return orgUnit;
    }
}

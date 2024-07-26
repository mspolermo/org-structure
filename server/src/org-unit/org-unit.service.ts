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
            where: {
                parentOrgUnitId: null,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Person,
                    as: 'chef',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Person,
                    as: 'persons',
                    where: {
                        isChef: false,
                        isManager: false,
                    },
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Person,
                    as: 'managers',
                    where: {
                        isManager: true,
                    },
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: OrgUnit,
                    as: 'childOrgUnitItems',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: Person,
                            as: 'chef',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: Person,
                            as: 'persons',
                            where: {
                                isChef: false,
                                isManager: false,
                            },
                            required: false,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: Person,
                            as: 'managers',
                            where: {
                                isManager: true,
                            },
                            required: false,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: OrgUnit,
                            as: 'childOrgUnitItems',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            include: [
                                {
                                    model: Person,
                                    as: 'chef',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                                {
                                    model: Person,
                                    as: 'persons',
                                    where: {
                                        isChef: false,
                                        isManager: false,
                                    },
                                    required: false,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                                {
                                    model: Person,
                                    as: 'managers',
                                    where: {
                                        isManager: true,
                                    },
                                    required: false,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                                {
                                    model: OrgUnit,
                                    as: 'childOrgUnitItems',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                    include: [
                                        {
                                            model: Person,
                                            as: 'chef',
                                            attributes: {
                                                exclude: [
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                        },
                                        {
                                            model: Person,
                                            as: 'persons',
                                            where: {
                                                isChef: false,
                                                isManager: false,
                                            },
                                            required: false,
                                            attributes: {
                                                exclude: [
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                        },
                                        {
                                            model: Person,
                                            as: 'managers',
                                            where: {
                                                isManager: true,
                                            },
                                            required: false,
                                            attributes: {
                                                exclude: [
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        return orgUnits;
    }

    async getOrgUnitById(id: string) {
        const orgUnit = await this.orgUnitRepository.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Person,
                    as: 'chef',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Person,
                    as: 'persons',
                    where: {
                        isChef: false,
                        isManager: false,
                    },
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: Person,
                    as: 'managers',
                    where: {
                        isManager: true,
                    },
                    required: false,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: OrgUnit,
                    as: 'childOrgUnitItems',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: Person,
                            as: 'chef',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: Person,
                            as: 'persons',
                            where: {
                                isChef: false,
                                isManager: false,
                            },
                            required: false,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: Person,
                            as: 'managers',
                            where: {
                                isManager: true,
                            },
                            required: false,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                        {
                            model: OrgUnit,
                            as: 'childOrgUnitItems',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            include: [
                                {
                                    model: Person,
                                    as: 'chef',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                                {
                                    model: Person,
                                    as: 'persons',
                                    where: {
                                        isChef: false,
                                        isManager: false,
                                    },
                                    required: false,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                                {
                                    model: Person,
                                    as: 'managers',
                                    where: {
                                        isManager: true,
                                    },
                                    required: false,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                                {
                                    model: OrgUnit,
                                    as: 'childOrgUnitItems',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                    include: [
                                        {
                                            model: Person,
                                            as: 'chef',
                                            attributes: {
                                                exclude: [
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                        },
                                        {
                                            model: Person,
                                            as: 'persons',
                                            where: {
                                                isChef: false,
                                                isManager: false,
                                            },
                                            required: false,
                                            attributes: {
                                                exclude: [
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                        },
                                        {
                                            model: Person,
                                            as: 'managers',
                                            where: {
                                                isManager: true,
                                            },
                                            required: false,
                                            attributes: {
                                                exclude: [
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!orgUnit) {
            throw new HttpException(
                'ОргЮнит с данным ID не найден',
                HttpStatus.BAD_REQUEST,
            );
        }

        return orgUnit;
    }

    async getOrgUnitsNavigation() {
        const parentOrgUnits = await this.orgUnitRepository.findAll({
            where: {
                nestingLevel: 0,
            },
            attributes: ['id', 'name'],
            include: [
                {
                    model: OrgUnit,
                    as: 'childOrgUnitItems',
                    where: {
                        nestingLevel: 1,
                    },
                    required: false,
                    attributes: ['id', 'name'],
                },
            ],
        });

        const result = parentOrgUnits.map((parentOrgUnit) => ({
            name: {
                id: parentOrgUnit.id,
                name: parentOrgUnit.name,
                isLink: true,
            },
            items: parentOrgUnit.childOrgUnitItems.map((childOrgUnit) => ({
                id: childOrgUnit.id,
                name: childOrgUnit.name,
                isLink: true,
            })),
        }));
        // TODO: добавить пользователя

        return {
            groups: result,
            user: {
                id: '0',
                fullName: 'Админов Админ Админович',
                shortName: 'Админов А.А.',
                allowDeveloperTools: true,
            },
        };
    }
}

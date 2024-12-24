import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';
import { Person } from 'src/persons/persons.model';
import { UpdateOrgUnitDto } from './dto/update-orgUnit.dto';
import { User } from 'src/users/users.model';
import { PersonsService } from 'src/persons/persons.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class OrgUnitService {
    constructor(
        private readonly personsService: PersonsService,
        private readonly favoritesService: FavoritesService,
        private rolesService: RolesService,
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

        console.log('DTO: ', dto);
        console.log('Nesting Level: ', nestingLevel);

        try {
            const orgUnit = await this.orgUnitRepository.create({
                ...dto,
                nestingLevel,
                workingHours: dto.workingHours || '08.00-17.00',
                lunchBreak: dto.lunchBreak || '12.00-12.45',
            });
            return orgUnit;
        } catch (error) {
            console.error('Error creating OrgUnit:', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
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

    async getOrgUnitsNavigation(user: User) {
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

        const person = await this.personsService.getPersonByEmail(user.email);
        const favorites = await this.favoritesService.getFavorites(user.id);
        const roles = await this.rolesService.getUserRoles(user.id);

        //TODO: исправить на нормальную ошибку

        if (!person) {
            throw new NotFoundException(
                `Person with email ${user.email} not found`,
            );
        }

        const hasAdminRole = roles.some((role) => role.value === 'ADMIN');

        return {
            groups: result,
            user: {
                id: person.id,
                name: person.name,
                email: user.email,
                roles,
                allowDeveloperTools: hasAdminRole,
            },
            favorites: favorites,
        };
    }

    async updateOrgUnit(id: string, dto: UpdateOrgUnitDto) {
        const orgUnit = await this.orgUnitRepository.findByPk(id);

        if (!orgUnit) {
            throw new HttpException(
                'ОргЮнит с данным ID не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        let nestingLevel = orgUnit.nestingLevel;

        if (
            dto.parentOrgUnitId &&
            dto.parentOrgUnitId !== orgUnit.parentOrgUnitId
        ) {
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

        try {
            await orgUnit.update({
                ...dto,
                nestingLevel,
            });
            return orgUnit;
        } catch (error) {
            console.error('Error updating OrgUnit:', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteOrgUnit(id: string) {
        const orgUnit = await this.orgUnitRepository.findByPk(id, {
            include: [
                { model: Person, as: 'persons' },
                { model: Person, as: 'managers' },
                { model: Person, as: 'chef' },
                { model: OrgUnit, as: 'childOrgUnitItems' },
            ],
        });

        if (!orgUnit) {
            throw new HttpException(
                'ОргЮнит с данным ID не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        if (orgUnit.persons && orgUnit.persons.length > 0) {
            throw new HttpException(
                'Невозможно удалить оргюнит с сотрудниками.',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (orgUnit.managers && orgUnit.managers.length > 0) {
            throw new HttpException(
                'Невозможно удалить оргюнит с менеджерами.',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (orgUnit.chef) {
            throw new HttpException(
                'Невозможно удалить оргюнит с назначенным руководителем.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Проверяем, есть ли дочерние подразделения
        const childOrgUnits = await this.orgUnitRepository.findAll({
            where: { parentOrgUnitId: id },
        });

        if (childOrgUnits.length > 0) {
            throw new HttpException(
                'Невозможно удалить оргюнит с дочерними подразделениями',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Удаляем оргюнит
        try {
            await orgUnit.destroy();
            return { message: 'ОргЮнит успешно удален' };
        } catch (error) {
            console.error('Error deleting OrgUnit:', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

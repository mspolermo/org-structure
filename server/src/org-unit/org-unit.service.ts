import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';

@Injectable()
export class OrgUnitService {
    constructor(
        @InjectModel(OrgUnit) private orgUnitRepository: typeof OrgUnit,
    ) {}

    async createOrgUnit(dto: CreateOrgUnitDto) {
        const orgUnit = await this.orgUnitRepository.create(dto);
        return orgUnit;
    }

    async getAllOrgUnits() {
        const orgUnits = await this.orgUnitRepository.findAll();
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

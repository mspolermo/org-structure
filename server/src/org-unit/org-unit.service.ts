import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';

@Injectable()
export class OrgUnitService {
    constructor(
        @InjectModel(OrgUnit) private orgUnitRepository: typeof OrgUnit,
    ) {}

    async createOrgUnit() {}

    async getAllOrgUnits() {}
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { FilterDashboardDto } from '../../domain/dtos/dashboard/filter.dashboard.dto';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) { }

	@Get()
	findAll(
		@Query() filters: FilterDashboardDto,
	) {
		return this.dashboardService.findAll(filters);
	}
}

import { Injectable } from '@nestjs/common';
import { CpmQueryDto } from './dto/cpm-query.dto';
import { EngagementQueryDto } from './dto/engagement-query.dto';

@Injectable()
export class MetricsService {
  getEngagement(query: EngagementQueryDto) {
    const rate = ((query.likes + query.comments) / query.followers) * 100;
    return { rate };
  }

  getCpm(query: CpmQueryDto) {
    const cpm = (query.cost / query.impressions) * 1000;
    return { cpm };
  }
}

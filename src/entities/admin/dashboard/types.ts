export interface GetDashboardBasicRes {
  newMembers: number;
  newPosts: number;
  newTrades: number;
  totalMembers: number;
  totalPosts: number;
  totalTrades: number;
}

export interface GetDashboardReq {
  from?: string;
  to?: string;
}

export interface GetDashboardMembersRes {
  totals: {
    visit: number;
    new: number;
    deactivated: number;
    banned: number;
  };
  points: MemberPointModel[];
}

interface MemberPointModel {
  time: string;
  visit: number;
  new: number;
  deactivated: number;
  banned: number;
}

export interface GetDashboardPostRes {
  totals: {
    registered: number;
    deleted: number;
  };
  categoryDistribution: CategoryModel[];
  areaDistribution: AreaModel[];
}

interface CategoryModel {
  categoryId: number;
  count: number;
}

interface AreaModel {
  emdId: number;
  count: number;
}

export interface GetDashboardTradeRes {
  totals: {
    total: number;
    canceled: number;
    rejected: number;
    requested: number;
    accepted: number;
    reserved: number;
    completed: number;
  };
}


export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface SecurityThreat {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Detected' | 'Secured' | 'Checking';
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  SCANNER = 'scanner',
  IDENTITY = 'identity',
  ADVISOR = 'advisor',
  LEARN = 'learn'
}

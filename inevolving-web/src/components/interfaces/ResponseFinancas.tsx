import { Transacao } from "./Transacao";

export interface ResponseFinancas {
  idUser: string;
  wage: number;
  totalBalance: number;
  availableCostOfLivingBalance: number;
  balanceAvailableToInvest: number;
  extraBalanceAdded: number;
  transactionsCostOfLiving: Transacao[];
  transactionsInvestment: Transacao[];
  transactionsExtraAdded: Transacao[];
}
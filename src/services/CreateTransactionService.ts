import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw new Error('Type of transaction not supported.');

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total <= value) {
      throw new Error('Outcome greater than total balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;

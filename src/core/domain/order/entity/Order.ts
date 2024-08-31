import { UserRole } from 'src/core/common/type/UserEnum';
import { OrderItemEntity } from './OrderItem';

export class OrderEntity {
  Id: string;

  userId: string;

  address: string;

  status: string;

  billingPhoneNumber: string;

  createdDate: Date;

  updatedDate: Date;

  orderItems:OrderItemEntity[]

  constructor(
    Id: string = '',
    userId: string,
    address: string,

    billingPhoneNumber: string,
    status: string,
    orderItems:OrderItemEntity[],
    createdDate?: Date,
    updatedDate?: Date,
    
  ) {
    this.Id = Id;
    this.userId = userId;
    this.address = address;

    this.billingPhoneNumber = billingPhoneNumber;
    this.status = status;
    this.orderItems=orderItems;
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
    
  }

  public static toEntity(order: any): OrderEntity {
    return new OrderEntity(
      order?.Id,
      order?.userId,
      order?.address,
      order?.billingPhoneNumber,
      order?.status,
      order?.orderItems,
      order?.createdDate,
      order?.updatedDate
    );
  }
}

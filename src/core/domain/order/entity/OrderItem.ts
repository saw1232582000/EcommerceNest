export class OrderItemEntity {
  Id: string;

  orderId: string;

  productId: string;

  status: string;

  quantity: number;

  createdDate: Date;

  constructor(
    Id: string = '',

    productId: string,
    status: string,
    quantity: number,
    orderId?: string,
    createdDate?: Date,
  ) {
    this.Id = Id;
    this.orderId = orderId;
    this.productId = productId;
    this.status = status;
    this.quantity = quantity;
    this.createdDate = createdDate || new Date();
  }

  public static toEntity(orderItem: any): OrderItemEntity {
    return new OrderItemEntity(
      orderItem?.Id,
      orderItem?.productId,
      orderItem?.status,
      orderItem?.quantity,
      orderItem?.orderId,
      orderItem?.createdDate,
    );
  }
}

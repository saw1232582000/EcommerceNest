export interface IBaseUseCase<TUseCaseInputData, TUseCaseResult> {
    execute(data?: TUseCaseInputData): Promise<TUseCaseResult>;
  }
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLocation {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}

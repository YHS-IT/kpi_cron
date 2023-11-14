import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("svc_admin", { schema: "data" })
export class SvcAdmin {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "role", nullable: true, length: 255 })
  role: string | null;

  @Column("varchar", { name: "comment", nullable: true, length: 255 })
  comment: string | null;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("svc_working_hour", { schema: "data" })
export class SvcWorkingHour {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "ent", nullable: true })
  ent: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @Column("datetime", { name: "start", nullable: true })
  start: Date | null;

  @Column("datetime", { name: "end", nullable: true })
  end: Date | null;

  @Column("text", { name: "comment", nullable: true })
  comment: string | null;
}

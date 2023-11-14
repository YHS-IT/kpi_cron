import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("process_program", { schema: "data" })
export class ProcessProgram {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("int", { name: "ent_id", nullable: true })
  entId: number | null;

  @Column("int", { name: "mkey", nullable: true })
  mkey: number | null;

  @Column("int", { name: "lot", nullable: true })
  lot: number | null;

  @Column("varchar", { name: "program_name", nullable: true, length: 50 })
  programName: string | null;

  @Column("varchar", { name: "program_code", nullable: true, length: 10000 })
  programCode: string | null;

  @Column("timestamp", { name: "start", nullable: true })
  start: Date | null;

  @Column("timestamp", { name: "end", nullable: true })
  end: Date | null;
}

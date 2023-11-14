import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";


@Index("end_mid_process", ["ent", "process", "mkey"], {})
@Index("mid_end", ["endYmdt", "mkey"], {})
@Index("list", ["lot", "mkey"], {})
@Entity("process_lot", { schema: "data" })
export class ProcessLot {
  @PrimaryGeneratedColumn({ type: "int", name: "lot", comment: "로트번호" })
  lot: number;

  @Column("varchar", {
    name: "ent",
    nullable: true,
    comment: "회사이름",
    length: 45,
  })
  ent: string | null;

  @Column("varchar", {
    name: "mid",
    nullable: true,
    comment: "장비ID",
    length: 45,
  })
  mid: string | null;

  @Column("int", { name: "mkey", nullable: true, default: () => "'-1'" })
  mkey: number | null;

  @Column("varchar", {
    name: "process",
    nullable: true,
    comment: "가공프로그램",
    length: 100,
  })
  process: string | null;

  @Column("int", {
    name: "plan_count",
    nullable: true,
    comment: "목표값",
    default: () => "'0'",
  })
  planCount: number | null;

  @Column("int", {
    name: "process_count",
    nullable: true,
    comment: "현재까지 생산개수",
    default: () => "'0'",
  })
  processCount: number | null;

  @Column("timestamp", {
    name: "start_ymdt",
    nullable: true,
    comment: "프로그램 시작 시간",
  })
  startYmdt: Date | null;

  @Column("timestamp", {
    name: "end_ymdt",
    nullable: true,
    comment: "프로그램 종료 시간",
  })
  endYmdt: Date | null;

  @Column("int", {
    name: "active",
    nullable: true,
    comment:
      "가공 총 소요시간(ms) 현재start~현재end까지 소요시간(기계세팅 등 준비시간 포함)",
    default: () => "'0'",
  })
  active: number | null;

  @Column("bigint", {
    name: "wait",
    nullable: true,
    comment: "교체시간(ms) 이전end~현재start까지 소요시간",
    default: () => "'0'",
  })
  wait: string | null;

  @Column("int", {
    name: "active_time",
    nullable: true,
    comment:
      "순수가공 소요시간(ms) 현재start~현재end까지 소요시간중 순수가공시간",
    default: () => "'0'",
  })
  activeTime: number | null;

  @Column("bigint", {
    name: "tot_active",
    nullable: true,
    default: () => "'0'",
  })
  totActive: string | null;

  @Column("bigint", { name: "tot_wait", nullable: true, default: () => "'0'" })
  totWait: string | null;

  @Column("bigint", {
    name: "tot_active_time",
    nullable: true,
    default: () => "'0'",
  })
  totActiveTime: string | null;

}

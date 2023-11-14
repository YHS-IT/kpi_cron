import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("mid_prod", ["program", "ent", "mkey"], {})
@Index("mid_lot", ["ent", "start", "mid", "lot", "mkey"], {})
@Index("hist_active_time", ["lot", "activeTime", "idle", "period"], {})
@Index("index_program", ["start", "end", "program", "count"], {})
@Index("end", ["end"], {})
@Index(
  "proc",
  ["start", "ent", "mid", "mkey", "program", "end", "activeTime"],
  {}
)
@Index("prdct_lot", ["lot", "ent"], {})
@Entity("process_hist", { schema: "data" })
export class ProcessHist {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("varchar", { name: "ent", comment: "회사명", length: 40 })
  ent: string;

  @Column("varchar", { name: "mid", comment: "장비ID", length: 45 })
  mid: string;

  @Column("int", {
    name: "mkey",
    nullable: true,
    comment: "기계 고유ID값 (svc_cnc.id 값이 들어감)",
    default: () => "'-1'",
  })
  mkey: number | null;

  @Column("int", { name: "lot", nullable: true, comment: "생산 로트" })
  lot: number | null;

  @Column("varchar", { name: "program", comment: "가공프로그램", length: 100 })
  program: string;

  @Column("int", {
    name: "plan",
    nullable: true,
    comment: "장비에서 지정한 목표 갯수",
  })
  plan: number | null;

  @Column("int", { name: "count", comment: "현재 가공갯수" })
  count: number;

  @Column("timestamp", {
    name: "start",
    nullable: true,
    comment: "단일갯수 가공 시작 시간",
  })
  start: Date | null;

  @Column("timestamp", {
    name: "end",
    nullable: true,
    comment: "단일갯수 가공 종료 시간",
  })
  end: Date | null;

  @Column("int", {
    name: "period",
    nullable: true,
    comment:
      "가공 총 소요시간(ms) 현재start~현재end까지 소요시간(기계세팅 등 준비시간 포함)",
  })
  period: number | null;

  @Column("int", {
    name: "idle",
    nullable: true,
    comment: "교체시간(ms) 이전end~현재start까지 소요시간",
  })
  idle: number | null;

  @Column("int", {
    name: "active_time",
    nullable: true,
    comment:
      "순수가공 소요시간(ms) 현재start~현재end까지 소요시간중 순수가공시간",
    default: () => "'0'",
  })
  activeTime: number | null;

  @Column("int", {
    name: "data_modi",
    nullable: true,
    comment: "기계 별도 수정여부 (기계에서 특정 수정이 있을시 ‘1’)",
    default: () => "'0'",
  })
  dataModi: number | null;

  @Column("timestamp", {
    name: "prdct_end",
    nullable: true,
    comment: "목표가공 완료 예측시간",
  })
  prdctEnd: Date | null;

}

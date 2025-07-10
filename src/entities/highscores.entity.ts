import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Profile } from './profile.entity'; // Adjust path if needed
  
  @Entity('highscores')
  export class Highscore {
    @PrimaryColumn({ type: 'date', name: 'submit_date' })
    submitDate: Date;
  
    @PrimaryColumn({ type: 'int' })
    mode: number;
  
    @PrimaryColumn({ type: 'int', name: 'id' })
    profileId: number;
  
    @ManyToOne(() => Profile)
    @JoinColumn({ name: 'id', referencedColumnName: 'id' })
    profile: Profile;
  
    @Column({ type: 'int' })
    score: number;
  }
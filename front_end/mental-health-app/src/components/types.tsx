import * as React from "react";

export interface Message {
  msg: string;
  audioUrl?: string | null;
  fromUser: boolean;
}

export interface Entry {
  id: number;
  date: Date;
}

export interface IconMapping {
  [key: number]: React.ReactElement;
}

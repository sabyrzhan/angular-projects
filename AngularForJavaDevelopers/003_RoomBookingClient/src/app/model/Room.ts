export class Room {
  id?: number;
  name?: string;
  location?: string;
  capacities: Array<LayoutCapacity> = new Array<LayoutCapacity>();

  static mapHttpRoom(httpRoom: Room): Room {
    const result = new Room();
    result.id = httpRoom.id;
    result.name = httpRoom.name;
    result.location = httpRoom.location;

    const caps = new Array<LayoutCapacity>();
    for (const c of httpRoom.capacities) {
      const cap = new LayoutCapacity();
      cap.capacity = c.capacity;
      cap.layout =  Room.layoutFromValue(c.layout!);
      caps.push(cap);
    }
    result.capacities = caps;

    return result;
  }

  private static layoutFromValue(layout: Layout): Layout | undefined {
    const entries = Object.entries(Layout);
    for (const e of entries) {
      if (e[0] === layout) {
        return e[1] as Layout;
      }
    }
    return undefined;
  }
}

export class LayoutCapacity {
  layout?: Layout;
  capacity?: number;
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board meeting'
}

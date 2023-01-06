/*
 * @Author: wxy
 * @Description: 享元模式
 * @Date: 2023-01-05 18:51:32
 * @LastEditTime: 2023-01-05 19:02:03
 */
class UPhoneFlyweight {
  constructor(
    public model: string,
    public screen: number,
    public memory: number
  ) {}
}

class FlyweightFactory {
  public phonesMap: Map<string, UPhoneFlyweight> = new Map();
  public get(model: string, screen: number, memory: number): UPhoneFlyweight {
    const key = model + screen + memory;
    if (!this.phonesMap.has(key)) {
      this.phonesMap.set(key, new UPhoneFlyweight(model, screen, memory));
    }
    return this.phonesMap.get(key)!;
  }
}

class UPhone {
  constructor(public flyweight: UPhoneFlyweight, public sn: number) {}
}

class UPhoneFactory {
  private static flyweightFactory: FlyweightFactory = new FlyweightFactory();
  public getUPhone(model: string, screen: number, memory: number, sn: number) {
    const flyweight: UPhoneFlyweight = UPhoneFactory.flyweightFactory.get(
      model,
      screen,
      memory
    );
    return new UPhone(flyweight, sn);
  }
}

const uphoneFactory = new UPhoneFactory();
let uphones: any = [];
for (let i = 0; i < 10008; i++) {
  let memory = i % 2 == 0 ? 64 : 128;
  uphones.push(uphoneFactory.getUPhone("8u", 5.0, memory, i));
  console.log(
    "UPhoneFlyweight count:",
    UPhoneFactory.flyweightFactory.phonesMap.size
  );
}

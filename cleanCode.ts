enum SubscriptionStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

enum UserRule {
    ADMIN= "admin",
    CREATE= "create",
    UPDATE= "update"
}

type User = {
    isActive: boolean;
    name: string;
    lastName: string;
    age: number;
    subscriptionStatus: SubscriptionStatus;
    email: string;
    rule: UserRule;
    isBanned: boolean;
}

enum UserActionType {
    CREATE = "create",
    UPDATE = "update",
    LOGIN = "login",
    LOGOUT = "logout"
}

const user: User = {
    name: "John",
    lastName: "Smith",
    email: "john@example.com",
    age: 30,
    isActive: true,
    isBanned: false,
    rule: UserRule.ADMIN,
    subscriptionStatus: SubscriptionStatus.ACTIVE,
}

/** evitar encadedo de if e else, use objetos */
type Order = {
    id: number;
    status: OrderStatus;
    isActive: boolean;
    amount: number;
    user: User;
};

type OrderMessage = {
    [key in OrderStatus]: string;
};

enum OrderStatus {
    PENDING = 'Pending',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
}

const order: Order = {
    id: 1234,
    status: OrderStatus.PENDING,
    isActive: true,
    amount: 1500,
    user
};

const orderMessages: OrderMessage = {
    [OrderStatus.PENDING] : 'Order is pending.',
    [OrderStatus.SHIPPED] : 'Order has been shipped.',
    [OrderStatus.DELIVERED] : 'Order has ben delivered.',
} as const

function getOrderMessage(status: OrderStatus): string {
    return orderMessages[status]
}

// const order: Order = {
//     id: 1234,
//     status: OrderStatus.PENDING,
// };

const msg = getOrderMessage(order.status);

/** ============================================================= */
/** evitar valores hardcode */

function fullDay(seconds) {
    const SECONDS_IN_A_DAY = process.env.SECONDS_IN_A_DAY || 86_400 
    return seconds >= SECONDS_IN_A_DAY
}

/** ============================================================= */
/** evitar encadeado de if else */

enum NotificationPriority {
    URGENT = "Urgent",
    REGULAR = "Regular"
}

function sendNotification(priority){
    console.log(`Sending ${priority} notification.`);
}

sendNotification(NotificationPriority.URGENT)

/** ============================================================= */
/** evitar functions com multiplos parametros, usar objetos */

type CreateUserParams = {
    name: string;
    age: number;
    email: string;
    rule: UserRule
}

function createUser(params: CreateUserParams){
    const { 
        name,
        age,
        email,
        rule 
    } = params
}

createUser({
    name: "John",
    age: 30,
    email: "john@example.com",
    rule: UserRule.ADMIN
})

/** ============================================================= */
/** use clausula salve guard, early return */

function processUser(user: User) {
    if(!user.isActive) return `User is inactive.`;
    if(user.age <= 18) return `User is underage.`;
    return `Processing user...`;
}

function processOrder(order: Order) {
    if(!order) return 'Invalid order.';
    if(!order.user.isActive) return 'User is not active.';
    if(order.status !== OrderStatus.PENDING) return 'Order status is not pending.'
    if(order.amount <= 0) return 'Order amount must be greater than zero.'
    return 'Order is valid and being processed.'
}

/** ============================================================= */
/** use const para rules mais legíveis */

function canAccessDash(user: User) {
    const isUserActive = user.isActive;
    const isUserOldEnough = user.age >= 18;
    const hasActiveSubscription = user.subscriptionStatus === "active";

    return isUserActive &&
            isUserOldEnough &&
            hasActiveSubscription;
}

/** ============================================================= */
/** use nome de functions | class auto explicativas */

function isValidForCalculation(number: number) {
    const isPositive = number > 0;
    const isInteger = number % 1 === 0;
    const isNotTooLarge = number <= 1000;
    
    return isPositive && 
            isInteger && 
            isNotTooLarge

}

function filterBannerdUsers(users: User[]){
    return users.filter((user: User) => user.isBanned)
}

function formatUserForDisplay(user: User) {
    return `${user.name} ${user.lastName}`
}

function isUserAdmin(user: User): boolean {
    return user.rule === UserRule.ADMIN
}

class UserProfile {
    process(userProfile: User) {
        return `User ${userProfile.name} processing... `
    }
}
const userProfile = new UserProfile()
const userProfileProcessor = userProfile.process(user)

class DateCalculator {
    addDaysToDate(date, days) {
        return new Date(date.getTime() + days * 86400000)
    }
}
const dateCalculator = new DateCalculator();
const futureDate = dateCalculator.addDaysToDate(new Date(), 3)

function handleUserAction(action){} 

handleUserAction({
    action: UserActionType.CREATE,
    data: user
})

/** ============================================================= */
/** utilizar is e has para os boolean ser mais descritivos */

const hasPermission = (user: User) => user.rule === "admin";
const isAdult = (user: User) => user.age >= 18;
const hasActiveSubscription = (user: User) => user.subscriptionStatus === "active";

/** ============================================================= */
/** crie padrões de nomenclaturas ou avalie as já criadas */

interface IUserRepository {
    findAll(): Promise<User[]>
    findById(id: number): Promise<User | null>
    create(user: Omit<User, 'id' | `createAt` | `updateAt`>) : Promise<User>
    update(user: Partial<Omit<User, 'id' | `createAt` | `updateAt`>>) : Promise<User | null>
    delete(id: number): Promise<boolean>
}

/** ============================================================= */
/** utilize metodos js para melhorar a legibilidade do cod */

function getActiveUsers(users: User[]){
    return users
            .filter(user => user.isActive)
            .map(user => user.name)
}

/** ============================================================= */
/** utilizar variaveis auto explicativas, passíveis de busca */

const terminalCount: number = 10;
const temperatureInCelsius: number = 25;
const isAdmin: boolean = isUserAdmin(user)

/** ============================================================= */
/** usar export default, evita renomeação */

// export function findAll() {}
// import { findAll } from '/';
// const { users } = findAll()

/** ============================================================= */


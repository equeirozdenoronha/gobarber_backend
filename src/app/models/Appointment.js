import Sequelize, { Model } from 'sequelize'

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }
    // Quando um model tem dois relacionamentos um com o outro precisa do as(apelido) para distinguir as relaões
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
    }
}

export default Appointment;
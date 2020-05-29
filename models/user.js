/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      openUserId: {
        type: DataTypes.STRING(32),
        allowNull: true,
        field: "openUserId"
      },
      certType: {
        type: DataTypes.STRING(32),
        allowNull: true,
        field: "certType"
      },

      certNo: {
        type: DataTypes.STRING(32),
        allowNull: true,
        field: "certNo"
      },
      certName: {
        type: DataTypes.STRING(32),
        allowNull: true,
        field: "certName"
      },
      faceImage: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        field: "faceImage"
      },
      imageId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "imageId"
      },
      ocrId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "ocrId"
      },
      certNation: {
        type: DataTypes.STRING(32),
        allowNull: true,
        field: "certNation"
      },
      certAddress: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "certAddress"
      },
      certValidity: {
        type: DataTypes.STRING(32),
        allowNull: true,
        field: "certValidity"
      },
      mobile: {
        type: DataTypes.STRING(16),
        allowNull: true,
        field: "mobile"
      },
      ocrFrontImage: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        field: "ocrFrontImage"
      },
      ocrBackImage: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        field: "ocrBackImage"
      },
      compareScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: "compareScore"
      },
      faceStatus: {
        type: DataTypes.INTEGER,
        field: "faceStatus"
      },
      maskFaceImageUrl: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        field: "maskFaceImageUrl"
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deletedAt"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "createdAt"
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updatedAt"
      }
    },
    {
      tableName: "users"
    }
  );
};

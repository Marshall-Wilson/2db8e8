class Api::ProspectsFilesController < ApplicationController
  require 'csv'

  before_action :authorized, only: @user

  def import
    if prospect_file_params[:file].blank? || prospect_file_params[:email_index].blank?
      return render status: 400, json: {message: "File or email index missing."}
    end

    new_prospect_file = ProspectsFile.create({
      **prospect_file_params,
      processed?: false,
      total: CSV.read(prospect_file_params[:file], {headers: prospect_file_params[:has_headers?] == "true"}).length,
      user_id: @user.id
    })

    BulkProspectUploadJob.perform_later(new_prospect_file, prospect_file_params[:file].path)
    render json: new_prospect_file
  end

  def progress
    prospect_file = ProspectsFile.find(params[:id])
    
    if prospect_file.user_id != @user.id
      return render status: 403, json: {message: "The prospect file does not belong to this user."}
    end

    render json: {
      file_name: prospect_file.file.filename,
      processed?: prospect_file.processed?,
      total: prospect_file.total,
      done:  prospect_file.prospects.count
    }
  end

  def prospect_file_params
    params.permit(:file, :email_index, :first_name_index?, :last_name_index?, :force?, :has_headers?)
  end
end

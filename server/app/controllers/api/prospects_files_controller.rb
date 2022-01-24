class Api::ProspectsFilesController < ApplicationController
  require 'csv'
  def import
    if prospect_file_params[:file].blank? || prospect_file_params[:email_index].blank?
      render status: 400, json: {message: "File or email index missing."}
      return
    end

    new_prospects = []
    total = 0
    CSV.foreach(prospect_file_params[:file], headers: (prospect_file_params[:has_headers?]) == "true") do |row|
      new_prospects << {
        email: row[prospect_file_params[:email_index].to_i],
        first_name: prospect_file_params[:first_name_index?].blank? ? nil : row[prospect_file_params[:first_name_index?].to_i],
        last_name: prospect_file_params[:last_name_index?].blank? ? nil : row[prospect_file_params[:last_name_index?].to_i],
        user_id: @user.id
      }
      total += 1
    end

    done = Prospect.bulk_import new_prospects, (prospect_file_params[:force?] == "true")

    render json: ProspectsFile.create({
      file: prospect_file_params[:file],
      total: total, 
      done: done,
      user_id: @user.id
    })
  end

  def progress
    prospect_file = ProspectsFile.find(params[:id])
    puts prospect_file.inspect
    render json: {
      total: prospect_file.total,
      done: prospect_file.done
    }
  end

  def prospect_file_params
    params.permit(:file, :email_index, :first_name_index?, :last_name_index?, :force?, :has_headers?)
  end
end
